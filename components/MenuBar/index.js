import Link from "next/link";
import Image from "next/image";

export default function MenuBar(props) {
  const { currentPage } = props;
  return (
    <div className="flex bg-white fixed bottom-0 h-14 justify-around z-30 max-w-md w-full -ml-4 mr-10 border-gray-icon border-t-[1px]">
      <Link
        href="/"
        passHref={true}
      >
        <button className="px-3 py-2 max-w-bar cursor-pointer mt-1">
          <Image src="/icon/home-icon.svg" alt="Home" width={27} height={27} />
          {currentPage == 1 && <div className="w-4 mx-auto rounded-full -mt-1 h-1 bg-main" />}
        </button>
      </Link>

      <Link
        href="/search"
        passHref={true}
      >
        <button className="px-3 py-2 max-w-bar cursor-pointer mt-1">
          <Image src="/icon/job-icon.svg" alt="Home" width={24} height={24} />
          {currentPage == 2 && <div className="w-4 mx-auto rounded-full -mt-1 h-1 bg-main" />}
        </button>
      </Link>
    </div>
  );
}
