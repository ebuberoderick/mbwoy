import Image from "next/image";
import AppLayout from "./components/layouts/appLayout";

export default function Home() {
  return (
    <AppLayout title={"Dashboard"}>
      <div className="grid lg:grid-cols-3">
        <div className="col-span-2 space-y-5">
          <div className="h-52 sm:h-72 md:h-80 bg-black rounded-xl">

          </div>
          <div className="grid gap-4 grid-cols-3">
            <div className="h-32 bg-opacity-20 rounded-xl bg-blue"></div>
            <div className="h-32 bg-opacity-20 rounded-xl bg-success"></div>
            <div className="h-32 bg-opacity-20 rounded-xl bg-danger"></div>
          </div>
          <div className="">
            <div className="font-semibold">Transaction History</div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </AppLayout>
  );
}
