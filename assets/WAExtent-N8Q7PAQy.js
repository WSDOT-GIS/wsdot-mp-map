import{_ as t}from"./index-6JpHv9Zb.js";const[{default:a},{default:r}]=await Promise.all([t(()=>import("./Extent-j-So29YN.js").then(e=>e.E),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9])),t(()=>import("./SpatialReference-Ux-W_d_y.js").then(e=>e.X),__vite__mapDeps([7,1,2,8,9,6]))]),i=new a({spatialReference:r.WebMercator,xmin:-13891559256092377e-9,ymin:5706937852318744e-9,xmax:-13014361668641392e-9,ymax:6283349610269844e-9});export{i as default,i as waExtent};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Extent-j-So29YN.js","assets/jsonMap-SF4MrsQ4.js","assets/config-XrSkRHRQ.js","assets/Point-puZ3YX-3.js","assets/cast-V9M_7g8Y.js","assets/reader-yp5T-YrE.js","assets/writer-_w9DtK4t.js","assets/SpatialReference-Ux-W_d_y.js","assets/index-6JpHv9Zb.js","assets/assets-VCAirUpR.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}