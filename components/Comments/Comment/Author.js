import React from "react";
import Link from "next/link";
import { countryCode } from "../../../helpers";

export default function Author({ data }) {
  return (
    <div className="CommentAuthor">
      <Link href={`/${countryCode()}/user/${data.username}`}>
        <a>
          {data.firstname} {data.lastname}
        </a>
      </Link>
    </div>
  );
}
