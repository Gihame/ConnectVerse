import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

const News = () => {
  return (
    <div className="border-l h-screen  p-2 w-[21vw]">
      <div className="search bg-[#D9D9D9] p-2 gap-2 bg-opacity-10 flex rounded-full ">
        <MagnifyingGlassIcon className="w-4 text-white" />
        <input
          type="text"
          placeholder="search by username"
          className=" bg-transparent outline-none text-white"
        />
      </div>
      <div className="subscribe text-white pt-4 px-2 ">
        <h2 className="font-bold text-xl">Get Verified</h2>
        <h4 className="py-4">Subscribe to unlock new Features</h4>
        <button className="bg-blue-700 px-6 py-1 text-white rounded-3xl">
          Get Verified
        </button>
      </div>
      <div className="popular text-white pt-4 px-2">
        <h1>What's happening?</h1>
        <h5 className="py-2">FIFA WORLD CUP FINAL</h5>
        <h6>ENGLAND VS MEXICO</h6>
      </div>
      <div className="contentss pt-6 overflow-y-scroll h-[55vh] px-2 ">
        <div className="content pt-4">
          <div className="topheader text-slate-400 flex justify-between">
            <div className="flex gap-2">
              <p>Enternainment</p>
              <p>Trending</p>
            </div>
            <EllipsisHorizontalIcon className="w-6 text-white" />
          </div>
          <div className="messaging text-slate-300 pt-4">#Marvels</div>
          <div className="messaging text-slate-400 pt-4">32.4 tweets</div>
        </div>
        <div className="content pt-4">
          <div className="topheader text-slate-400 flex justify-between">
            <div className="flex gap-2">
              <p>Enternainment</p>
              <p>Trending</p>
            </div>
            <EllipsisHorizontalIcon className="w-6 text-white" />
          </div>
          <div className="messaging text-slate-300 pt-4">#Marvels</div>
          <div className="messaging text-slate-400 pt-4">32.4 tweets</div>
        </div>
        <div className="content pt-4">
          <div className="topheader text-slate-400 flex justify-between">
            <div className="flex gap-2">
              <p>Enternainment</p>
              <p>Trending</p>
            </div>
            <EllipsisHorizontalIcon className="w-6 text-white" />
          </div>
          <div className="messaging text-slate-300 pt-4">#Marvels</div>
          <div className="messaging text-slate-400 pt-4">32.4 tweets</div>
        </div>
        <div className="content pt-4">
          <div className="topheader text-slate-400 flex justify-between">
            <div className="flex gap-2">
              <p>Enternainment</p>
              <p>Trending</p>
            </div>
            <EllipsisHorizontalIcon className="w-6 text-white" />
          </div>
          <div className="messaging text-slate-300 pt-4">#Marvels</div>
          <div className="messaging text-slate-400 pt-4">32.4 tweets</div>
        </div>
      </div>
    </div>
  );
};

export default News;
