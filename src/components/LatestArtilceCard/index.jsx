import Link from "next/link";
import limitString from "@/utils/limitString";
import convertDate from "@/utils/convertDate";

export default function LatestArticleCard({ articles }) {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Latest Articles
      </h4>

      <div>
        {articles?.map((article, key) => (
          <Link
            href={`/articles/${article.id}`}
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full items-center flex">
              <img
                width={56}
                height={56}
                src={article.thumbnail}
                alt="Article"
                style={{
                  width: "auto",
                  height: "auto",
                }}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {limitString(article.title, 35)}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {convertDate(article.publishedAt)}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
