import RegistrationForm from "@/components/RegistrationForm";
import Header from "@/components/Header";

const RegisterRentals = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <RegistrationForm
        type="rentals"
        title="Register Your Rental Property"
        description="List your property details and attract quality tenants"
        backPath="/rentals"
      />
    </div>
  );
};

export default RegisterRentals;