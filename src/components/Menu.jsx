import ModuleCard from "./ModuleCard";
import { useNavigate } from "react-router-dom";

export default function Menu({ changeModule }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Modules</h1>
      <ModuleCard
        title="Multiplication Tables"
        description="Practice your multiplication tables, from 2x2 to 12x12"
        onClick={() => {
          changeModule("multiplication");
          navigate("/");
        }}
      />
      <ModuleCard
        title="Percentages"
        description="Practice practical percentages"
        onClick={() => {
          changeModule("percentages");
          navigate("/");
        }}
      />
    </div>
  );
}
