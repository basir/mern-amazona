# Video-56-Forget-Reset-Password

1. set base url and mailgun key in .env file
   BASE_URL=http://localhost:3000
   MAILGUN_DOMAIN=mg.xxx
   MAILGUN_API_KEY=key-xxx
   add
   BASE_URL=http://localhost:3000
   to .env.example

2. set editor config in vs code setting

   ```js
        {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "prettier.semi": true,
        "prettier.singleQuote": true
        }
   ```

3. set port to 4000 to prevent issue in macos:
   server.js
   `const port = process.env.PORT || 4000;`
   frontend/package.json
   `"proxy": "http://localhost:5000",`

4. create baseUrl function
   in utils.js

   ```js
   export const baseUrl = () =>
     process.env.BASE_URL
       ? process.env.BASE_URL
       : process.env.NODE_ENV !== 'production'
       ? 'http://localhost:3000'
       : 'https://yourdomain.com';
   ```

5. Reset Password Backend API
   add `/api/reset-password` api to userRouters.js

   ```js
   userRouter.post(
     '/forget-password',
     expressAsyncHandler(async (req, res) => {
       const user = await User.findOne({ email: req.body.email });
       if (user) {
         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
           expiresIn: '3h',
         });

         user.resetToken = token;
         await user.save();

         //reset link
         console.log(`${baseUrl()}/reset-password/${token}`);

         mailgun()
           .messages()
           .send(
             {
               from: 'Amazona <me@mg.yourdomain.com>',
               to: `${user.name} <${user.email}>`,
               subject: `Reset Password`,
               html: ` 
                <p>Please Click the following link to reset your password:</p> 
                <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
                `,
             },
             (error, body) => {
               console.log(error);
               console.log(body);
             }
           );

         res.send({ message: 'We sent reset password link to your email.' });
       } else {
         res.status(404).send({ message: 'User not found' });
       }
     })
   );
   ```

6. Reset Password Backend API
   add `/api/reset-password` api to userRouters.js

   ```js
   userRouter.post(
     '/reset-password',
     expressAsyncHandler(async (req, res) => {
       jwt.verify(
         req.body.token,
         process.env.JWT_SECRET,
         async (err, decode) => {
           if (err) {
             res.status(401).send({ message: 'Invalid Token' });
           } else {
             const user = await User.findOne({ resetToken: req.body.token });
             if (user) {
               if (req.body.password) {
                 user.password = bcrypt.hashSync(req.body.password, 8);
                 await user.save();
                 res.send({
                   message: 'Password reseted successfully',
                 });
               }
             } else {
               res.status(404).send({ message: 'User not found' });
             }
           }
         }
       );
     })
   );
   ```

7. add resetToken field to user model
   userModel.js
   `resetToken: { type: String },`

8. add forget password link to signin screen

   ```js
   <div className="mb-3">
     Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
   </div>
   ```

9. create forget password screen

   ```js
   export default function ForgetPasswordScreen() {
     const navigate = useNavigate();
     const [email, setEmail] = useState('');

     const { state } = useContext(Store);
     const { userInfo } = state;
     const submitHandler = async (e) => {
       e.preventDefault();
       try {
         const { data } = await Axios.post('/api/users/forget-password', {
           email,
         });
         toast.success(data.message);
       } catch (err) {
         toast.error(getError(err));
       }
     };

     useEffect(() => {
       if (userInfo) {
         navigate('/');
       }
     }, [navigate, userInfo]);

     return (
       <Container className="small-container">
         <Helmet>
           <title>Forget Password</title>
         </Helmet>
         <h1 className="my-3">Forget Password</h1>
         <Form onSubmit={submitHandler}>
           <Form.Group className="mb-3" controlId="email">
             <Form.Label>Email</Form.Label>
             <Form.Control
               type="email"
               required
               onChange={(e) => setEmail(e.target.value)}
             />
           </Form.Group>

           <div className="mb-3">
             <Button type="submit">submit</Button>
           </div>
         </Form>
       </Container>
     );
   }
   ```

10. Create Reset Screen

    ```js
    export default function ResetPasswordScreen() {
      const navigate = useNavigate();

      const { token } = useParams();

      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');

      const { state } = useContext(Store);
      const { userInfo } = state;
      const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        try {
          await Axios.post('/api/users/reset-password', {
            password,
            token,
          });
          navigate('/signin');
          toast.success('Password updated successfully');
        } catch (err) {
          toast.error(getError(err));
        }
      };

      useEffect(() => {
        if (userInfo || !token) {
          navigate('/');
        }
      }, [navigate, userInfo, token]);

      return (
        <Container className="small-container">
          <Helmet>
            <title>Reset Password</title>
          </Helmet>
          <h1 className="my-3">Reset Password</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">Reset Password</Button>
            </div>
          </Form>
        </Container>
      );
    }
    ```

11. add routes in App.js

    ```js
    import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
    import ResetPasswordScreen from './screens/ResetPasswordScreen';
    ...
    <Route
    path="/forget-password"
    element={<ForgetPasswordScreen />}
    />
    <Route
    path="/reset-password/:token"
    element={<ResetPasswordScreen />}
    />
    ```

12. restart app
