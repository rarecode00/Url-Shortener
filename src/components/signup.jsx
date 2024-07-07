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
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [errors, setErrors] = useState([]);
  const { data, error, loading, fn: fnSignup } = useFetch(signUp, formData);
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(files);
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
        profile_pic: Yup.mixed().required("Profile Pic is Required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};
      e.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ``}`);
      fetchUser();
    }
  }, [data, error]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create your account if you haven&rsquo;t not already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
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
          <div className="space-y-1">
            <input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSignup()}>
            {loading ? <BeatLoader size={10} /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
