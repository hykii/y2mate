const {default: axios} = require("axios");
const qs = require("qs");

exports.y2mate = class y2mate {
    constructor() {

    }
    async ajax(url) {
        let ajax = await axios.post("https://www.y2mate.com/mates/en439/analyze/ajax", qs.stringify({
            "url": url,
            "q_auto": "0",
            "ajax": "1"
        }), {
            headers: {
                "Host": "www.y2mate.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
                "Accept": "*/*",
                "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
                "Accept-Encoding": "utf-8",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Origin": "https://www.y2mate.com",
                "Alt-Used": "www.y2mate.com",
                "Connection": "keep-alive",
                "Referer": "https://www.y2mate.com/en439",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "TE": "trailers"
            }
        }).then((response) => { return response.data });
        if(ajax["status"] == "success") {
            ajax = ajax["result"];
            let temp = {};
            temp["k_data_vid"] = ajax.split("> var k_data_vid = \"")[1].split("\"; var k_data_vtitle = \"")[0];
            eval(`temp["k_data_vtitle"] = \`${ajax.split("; var k_data_vtitle = \"")[1].split("\"; var k__id = \"")[0]}\``);
            temp["k__id"] = ajax.split("; var k__id = \"")[1].split("\"; var video_service = \"")[0];
            temp["video_service"] = ajax.split("; var video_service = \"")[1].split("\"; var video_extractor = \"")[0];
            let temp2 = ajax.split("<div class=\"tab-content\">")[1].split("<table class=\"table table-bordered\">")[1].split("<tbody>")[1].split("</tbody>")[0];
            temp2 = Array.from(temp2.matchAll(/data-fquality="[a-zA-Z0-9 ]{1,10}"/g));
            let quality_keywords = [];
            for(let fquality of temp2) {
                quality_keywords.push(fquality[0].split("data-fquality=\"")[1].split("\"")[0]);
            }
            temp["quality_keywords"] = Array.from(new Set(quality_keywords)); // Remove duplicates from Array
            return temp;
        }else{
            throw new Error(ajax["status"]);
        }
    }
    async convert(type, _id, v_id, fquality) {
        let convert = await axios.post("https://www.y2mate.com/mates/convert", qs.stringify({
            "type": type,
            "_id": _id,
            "v_id": v_id,
            "ftype": "mp4",
            "fquality": fquality,
            "ajax": "1",
            "token": ""
        }), {
            headers: {
                "Host": "www.y2mate.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
                "Accept": "*/*",
                "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
                "Accept-Encoding": "utf-8",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Origin": "https://www.y2mate.com",
                "Alt-Used": "www.y2mate.com",
                "Connection": "keep-alive",
                "Referer": `https://www.y2mate.com/youtube/${v_id}`,
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            }
        }).then((response) => { return response.data });
        if(convert["status"] == "success") {
            return convert["result"].split("<div class=\"form-group has-success has-feedback\">")[1].split("<a href=\"")[1].split("\" rel=")[0];
        }else{
            throw new Error(ajax["status"]);
        }
    }
}
