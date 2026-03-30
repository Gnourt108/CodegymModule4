package com.example.validatesong.service;

import com.example.validatesong.entity.Song;
import com.example.validatesong.repository.ISongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService implements ISongService{

    @Autowired
    private ISongRepository songRepository;

    @Override
    public void save(Song song) {
        songRepository.save(song);
    }

    @Override
    public void deleteById(Integer id) {
        songRepository.deleteById(id);
    }

    @Override
    public List<Song> findAll() {
        return songRepository.findAll();
    }

    @Override
    public Optional<Song> findById(Integer id) {
        return songRepository.findById(id);
    }
}
