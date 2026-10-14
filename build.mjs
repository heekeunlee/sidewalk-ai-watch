// content/plan.html(원문, 커밋하지 않음)을 비밀번호로 AES-GCM 암호화해 docs/index.html 생성
// 사용법: SITE_PASSWORD=0001 node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";

const pw = process.env.SITE_PASSWORD;
if (!pw) throw new Error("SITE_PASSWORD 환경변수가 필요합니다.");

const iter = 600000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
  base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(readFileSync("content/plan.html", "utf8")));

const b64 = u => Buffer.from(u).toString("base64");
const payload = JSON.stringify({ iter, salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(data)) });
mkdirSync("docs", { recursive: true });
writeFileSync("docs/index.html", readFileSync("template.html", "utf8").replace("__PAYLOAD__", () => payload));
writeFileSync("docs/.nojekyll", "");
console.log("docs/index.html 생성 완료");
