interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-80 mx-auto border p-6">
        {children}
      </div>
    </div>
  );
}
