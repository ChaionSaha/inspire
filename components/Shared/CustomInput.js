
import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const CustomInput = ({control, name, label, type}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field:{onChange, value} }) => (
                <Input variant="bordered" radius="none" size="lg" onValueChange={onChange} value={value} type={type} label={label} />
            )}
        />
    );
}

export default CustomInput;