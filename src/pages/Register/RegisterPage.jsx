import RegisterForm from "../../components/Form/RegisterForm";
import { handleRegister } from "../../api/firebase";
import { useNavigate, useActionData, useNavigation } from "react-router-dom";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import { useEffect } from "react";

function RegisterPage() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (data?.type === "SUCCESS") {
      navigate("/login", {
        replace: true,
        state: { message: "Registration successful! Please login." }
      });
    }
  }, [data]);

  return (
    <AnimateProvider>
      {data?.type === "ERROR" && (
        <p className="text-rose-700 text-xs font-bold mb-3">
          Error: {data.message.split("(")[1]?.replace(")", "") || data.message}
        </p>
      )}
      {navigation.state === "loading" && (
        <p className="text-blue-500 text-xs font-bold mb-3">
          Creating your account...
        </p>
      )}
      <RegisterForm isSubmitting={navigation.state === "submitting"} />
    </AnimateProvider>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const confirmPwd = formData.get("confirmPw").trim();

  if (password !== confirmPwd) {
    return {
      type: "ERROR",
      message: "Password and confirm password must match.",
    };
  }

  try {
    await handleRegister(email, password);
    return { 
      type: "SUCCESS",
      message: "Account created successfully"
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { 
      type: "ERROR", 
      message: error.message 
    };
  }
}

export default RegisterPage;