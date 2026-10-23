const PortalAvatar = () => {
  return (
    // Disembunyikan di layar kecil
    <div className="hidden items-center justify-center md:flex">
      <div className="flex items-end rounded-full bg-portal/30 p-8 ring-8 ring-portal/40">
        <img
          src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          alt="Rick Sanchez"
          className="size-32 rounded-full border-4 border-paper object-cover"
        />
        <img
          src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          alt="Morty Smith"
          className="-ml-5 size-32 rounded-full border-4 border-paper object-cover"
        />
      </div>
    </div>
  );
};

export default PortalAvatar;