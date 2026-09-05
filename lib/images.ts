function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const img = {
  // Không gian sống (lifestyle / room scenes)
  heroLivingRoom: unsplash("1586023492125-27b2c045efd7"),
  livingRoomBlue: unsplash("1493809842364-78817add7ffb"),
  diningScene: unsplash("1519710164239-da123dc03ef4"),
  bedroomArt: unsplash("1505691938895-1758d7feb511"),
  livingRoomGreen: unsplash("1583847268964-b28dc8f51f92"),
  houseExterior: unsplash("1600585154340-be6161a56a0c"),
  loftLamp: unsplash("1524758631624-e2822e304c36"),
  livingRoomClock: unsplash("1616486338812-3dadae4b4ace"),
  livingRoomLeather: unsplash("1554995207-c18c203602cb"),
  bedroomNeutral: unsplash("1595526114035-0d45ed16cfbf"),
  livingRoomStripe: unsplash("1618221195710-dd6b41faaea6"),
  openLivingDining: unsplash("1560448204-e02f11c3d0e2"),
  bedroomLux: unsplash("1615874959474-d609969a20ed"),

  // Sản phẩm (product-style shots)
  sofaCam: unsplash("1567016432779-094069958ea5"),
  armchairTrang: unsplash("1567538096630-e0c55bd6374c"),
  sofaXanhNhung: unsplash("1555041469-a586c61ea9bc"),
  sofaTho: unsplash("1493663284031-b7e3aefcae8e"),
  armchairVang: unsplash("1550226891-ef816aed4a98"),
  gheDen: unsplash("1592078615290-033ee584e267"),
  gheTinhKhoi: unsplash("1499933374294-4584851497cc"),
  tuDauGiuong: unsplash("1519947486511-46149fa0a254"),
  armchairKem: unsplash("1580480055273-228ff5388ef8"),
  gheKem: unsplash("1592229505726-ca121723b8ef"),
  tuDauGiuongLa: unsplash("1567225557594-88d73e55f2cb"),
  dongHo: unsplash("1533090161767-e6ffed986c88"),
  goiTua: unsplash("1616627989132-9f7bc9c99f4e"),
  banAnSang: unsplash("1522708323590-d24dbb6b0267"),
};
