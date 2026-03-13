package com.example.simpledictionary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/dictionary")
public class DictionaryController {
    private static final Map<String, String> dictionary = new HashMap<>();

    static {
        dictionary.put("hello",      "Xin chào");
        dictionary.put("world",      "Thế giới");
        dictionary.put("book",       "Quyển sách");
        dictionary.put("computer",   "Máy tính");
        dictionary.put("house",      "Ngôi nhà");
        dictionary.put("school",     "Trường học");
        dictionary.put("teacher",    "Giáo viên");
        dictionary.put("student",    "Học sinh / Sinh viên");
        dictionary.put("apple",      "Quả táo");
        dictionary.put("water",      "Nước");
        dictionary.put("food",       "Thức ăn");
        dictionary.put("car",        "Xe hơi / Ô tô");
        dictionary.put("phone",      "Điện thoại");
        dictionary.put("love",       "Tình yêu / Yêu thương");
        dictionary.put("family",     "Gia đình");
        dictionary.put("friend",     "Bạn bè");
        dictionary.put("time",       "Thời gian");
        dictionary.put("money",      "Tiền bạc");
        dictionary.put("city",       "Thành phố");
        dictionary.put("country",    "Đất nước / Quốc gia");
        dictionary.put("dog",        "Con chó");
        dictionary.put("cat",        "Con mèo");
        dictionary.put("sun",        "Mặt trời");
        dictionary.put("moon",       "Mặt trăng");
        dictionary.put("sky",        "Bầu trời");
        dictionary.put("river",      "Dòng sông");
        dictionary.put("mountain",   "Núi");
        dictionary.put("happy",      "Vui vẻ / Hạnh phúc");
        dictionary.put("beautiful",  "Đẹp / Xinh đẹp");
        dictionary.put("big",        "To / Lớn");
    }

    @GetMapping
    public String showForm(){
        return "index";
    }

    @PostMapping("/search")
    public String search(@RequestParam(name = "keyword")String keyword, Model model){
        String keywordTrimmed = keyword.trim().toLowerCase();
        model.addAttribute("keyword", keywordTrimmed);

        if(keywordTrimmed.isEmpty()){
            model.addAttribute("error", "Vui lòng nhập từ cần tra cứu");
            return "index";
        }

        String meaning = dictionary.get(keywordTrimmed);
        if(meaning != null){
            model.addAttribute("meaning", meaning);
        }else {
            model.addAttribute("notFound", true);
        }
        return "index";
    }

}
