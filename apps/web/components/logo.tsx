import Image from "next/image";

export default function Logo() {
  return (
    <h1 className="flex items-center font-ibm">
      <Image src="/logo.svg" alt="Quarry logo" width={40} height={40} />
      <span className="ml-2 text-2xl font-semibold text-primary">Quarry</span>
    </h1>
  );
}
