package com.example.validatesong.service;

import com.example.validatesong.entity.Song;

import java.util.List;
import java.util.Optional;

public interface ISongService {
    void save(Song song);
    void deleteById(Integer id);
    List<Song> findAll();
    Optional<Song> findById(Integer id);

}
