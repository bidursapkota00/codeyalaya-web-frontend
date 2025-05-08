import { OwnerGuard } from "../owner-guard";

export default function Dashboard() {
  return (
    <OwnerGuard>
      <div>Dashboard</div>
    </OwnerGuard>
  );
}
