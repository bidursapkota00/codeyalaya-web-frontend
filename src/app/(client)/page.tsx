import SocialLogin from "../(auth)/socialLogin";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-primary">
        <div className="text-xl font-bold text-primary-foreground">
          Codeyalaya
        </div>
        <SocialLogin />
      </nav>
    </div>
  );
}
