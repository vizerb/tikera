import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../state/tikeraApiSlice";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [sendLogin] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await sendLogin({ email, password }).unwrap();

      dispatch(
        login({
          user: result.data.user,
          token: result.data.token,
        })
      );

      setErrors({});
      toast.success("Sikeres bejelentkezés");
      navigate("/", { replace: true });
    } catch (err) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Ismeretlen hiba.");
      }
    }
  };

  return (
    <div className="container mx-auto pt-12 min-h-screen max-w-2xl flex justify-center items-center px-4">
      <div className="w-full bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Bejelentkezés</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="form-control">
            <input
              type="password"
              name="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary w-full" type="submit">
              Bejelentkezés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
