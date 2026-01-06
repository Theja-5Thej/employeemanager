import { Switch } from "@mui/material";
import React from "react";


type Props = {
    isActive: boolean;
    onToggle: () => void;
};

const StatusToggle = ({ isActive, onToggle }: Props) => {
    return (
        <div className="flex  xl:w-12.5 items-center gap-2">
            {isActive ? (
                'Active ' 
            ) : (
                'Inactive'
            )}

            <Switch
                checked={isActive}
                onChange={onToggle} // ✅ no params passed
                color="success"
            />

        </div>
    );
};

export default React.memo(StatusToggle);
