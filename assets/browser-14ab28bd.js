/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */function e(){return navigator.userAgentData}function a(){const n=e();return n!=null&&n.brands?n.brands.map(({brand:t,version:r})=>`${t}/${r}`).join(" "):navigator.userAgent}export{e as a,a as g};
