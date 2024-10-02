import { Loader as Spinner } from "lucide-react";


type LoaderProps = {
  smallHeight?: boolean;
};

const Loader= ({ smallHeight }: LoaderProps) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <Spinner height={35} width={4} radius={2} className="size-4 mx-auto animate-spin text-muted-foreground" />
    </div>
  );
}

export default Loader;