function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f0f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#131118]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <a href="/">
          <h2 className="text-[#131118] text-lg font-bold leading-tight tracking-[-0.015em]">
            StudySmart
          </h2>
        </a>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-[#131118] text-sm font-medium leading-normal" href="/">
            Dashboard
          </a>
          <a className="text-[#131118] text-sm font-medium leading-normal" href="/history">
            History
          </a>
          <a className="text-[#131118] text-sm font-medium leading-normal" href="/upload">
            Upload
          </a>
        </div>
        <button
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f1f0f4] text-[#131118] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
        >
          <div className="text-[#131118]" data-icon="Bell" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
              ></path>
            </svg>
          </div>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQl6PzijbJ9ok8zA0I6-QD4ZQXOcsDC7Z_oDqGkBIGannpREYuF5FHtsinR2BK1I1hYKjxLYJspIHFi-HvQdzid2jFaU8TaIeqymHVfolIUyLuzdL7T1bDSyvsgSzIQ14gNiY-VhZLHizqVGm7bXDVjl_MY4-mv4bsTrMklXmyXzwGAwA0dV7RqPPUM0QZiYMVqZ3khxsP4j32J0bpCCEkjVqklg7fKEutjgoX0FK_OWMKjS4wIy7WvWNY_dHPSVevisxwsUoIve4b")' }}
        ></div>
      </div>
    </header>
  )
}

export default Navbar