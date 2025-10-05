import RegistrationForm from "@/components/RegistrationForm";
import Header from "@/components/Header";

const RegisterNeedRoommate = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <RegistrationForm
        type="need-roommate"
        title="Register as Someone Who Needs a Roommate"
        description="Tell us about yourself and find the perfect roommate for your space"
        backPath="/need-roommate"
      />
    </div>
  );
};

export default RegisterNeedRoommate;