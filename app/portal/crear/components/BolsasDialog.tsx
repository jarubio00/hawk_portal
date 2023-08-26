'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {Button} from "@/components/ui/button";

interface BolsasDialogProps {
 open: boolean;
 onClose: (val: any) => void;
}

const BolsasDialog: React.FC<BolsasDialogProps> = ({
 open,
 onClose
}) => {
 return (
    <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
        <Button  onClick={() => {}}>Bolsa</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Agrega un empaque a tu envío</AlertDialogTitle>
            <div>
                <img
                    className="hidden w-full md:block cursor-pointer" 
                    src="/images/bolsa.jpg" 
                    
                />
                <img
                    className="block h-10  md:hidden cursor-pointer" 
                    src="/images/bolsa.jpg" 
                    
                />
                </div>
            <AlertDialogDescription>
            Si tu paquete es pequeño o no quieres que peguemos nuestra etiqueta de envío en él, puedes agregar una bolsa a tu pedido. 
            </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 mb-28">
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una bolsa" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Plastico</SelectLabel> */}
                    <SelectItem value="sm">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <p>Bolsa pequeña 20x15cm</p>
                            <p>+$5.00</p>
                        </div>
                    </SelectItem>
                    <SelectItem value="md">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <p>Bolsa mediana 35x25cm</p>
                            <p>+$10.00</p>
                        </div>
                    </SelectItem>
                    <SelectItem value="lg">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <p>Bolsa grande 40x35cm</p>
                            <p>+$15.00</p>
                        </div>
                    </SelectItem>
                    
                </SelectGroup>
            </SelectContent>
            </Select>
        </div>
        <AlertDialogFooter>
            <AlertDialogCancel className="mx-2 px-2">No, gracias</AlertDialogCancel>
            <AlertDialogAction className="mx-2 px-2" onClick={() => onClose('value')}>Agregar bolsa</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
 );
}

export default BolsasDialog;