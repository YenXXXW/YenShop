import Link from "next/link";
import React from "react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItem: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItem.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`join-item btn ${
          currentPage === page ? " btn-active pointer-events-none " : ""
        }`}
      >
        {page}
      </Link>
    );
  }

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItem}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={"?page" + (currentPage - 1)} className="bn join-item">
            {" "}
            «
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={"?page" + (currentPage + 1)} className="bn join-item">
            {" "}
            »
          </Link>
        )}
      </div>
    </>
  );
}
