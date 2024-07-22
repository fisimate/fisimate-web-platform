import Link from "next/link";

export default function Leaderboard({ data }) {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Leaderboard
      </h4>

      <div>
        {data?.map((item, key) => (
          <Link
            href={`/students`}
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <span className="h-12 w-12 rounded-full overflow-hidden">
              <img
                width={48}
                height={48}
                src={
                  item?.user?.profilePicture ?? "/images/user/user-avatar.png"
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="User"
              />
            </span>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {item.user.fullname}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {item.user.nis}
                  </span>
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-medium text-white">
                  {item._sum.score}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
