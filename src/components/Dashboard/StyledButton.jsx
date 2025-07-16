import { Button } from "@mui/material";

const StyledButton = ({ children, icon, onClick, variant = "outlined", ...props }) => (
  <Button
    variant={variant}
    onClick={onClick}
    startIcon={icon}
    className={`!rounded-full px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition ${
      variant === "contained" ? "!bg-blue-500 hover:!bg-blue-600 !text-white" : ""
    } `}
    {...props}
  >
    {children}
  </Button>
);

export default StyledButton;
