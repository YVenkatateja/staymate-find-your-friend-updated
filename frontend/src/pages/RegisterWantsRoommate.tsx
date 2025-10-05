import RegistrationForm from "@/components/RegistrationForm";
import Header from "@/components/Header";

const RegisterWantsRoommate = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <RegistrationForm
        type="wants-roommate"
        title="Register as Someone Who Wants to Be a Roommate"
        description="Create your profile and find people looking for roommates"
        backPath="/wants-to-be-roommate"
      />
    </div>
  );
};

export default RegisterWantsRoommate;