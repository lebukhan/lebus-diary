export const dynamic = "force-static";
export function GET() {
  return Response.json ([{
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "app.vercel.lebus_diary.twa",
        "sha256_cert_fingerprints": ["6E:0C:8A:5E:C6:50:68:AD:C9:F4:75:D8:85:CE:FF:ED:10:CF:4F:FB:AD:39:FD:BA:9B:81:E8:A0:97:1D:FA:EF"]
      }
    }]);
}
