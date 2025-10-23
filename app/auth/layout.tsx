interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
