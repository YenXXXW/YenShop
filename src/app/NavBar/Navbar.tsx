import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpg";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function SearchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <nav className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2 items-center">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost ">
            <Image src={logo} width={170} height={40} alt={"logo"} />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={SearchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Seatch"
                className="input input-bordered w-full min-w-[200px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </nav>
  );
}
