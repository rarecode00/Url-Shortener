import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Error from "./error";
import { useState } from "react";
import * as Yup from "yup";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });
      await schema.validate(formData, { abortEarly: false });
    } catch (e) {
      const newErrors = {};
      e.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          <Error message={"Some Err msg"} />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter your Password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleLogin()}>
            {true ? <BeatLoader size={10} /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
