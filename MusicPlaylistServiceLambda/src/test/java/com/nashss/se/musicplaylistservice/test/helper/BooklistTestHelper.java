package com.nashss.se.musicplaylistservice.test.helper;

import com.nashss.se.musicplaylistservice.dynamodb.models.AlbumTrack;
import com.nashss.se.musicplaylistservice.dynamodb.models.Book;
import com.nashss.se.musicplaylistservice.dynamodb.models.Booklist;
import com.nashss.se.musicplaylistservice.dynamodb.models.Playlist;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public final class BooklistTestHelper {
    private BooklistTestHelper() {
    }

    public static Booklist generateBooklist() {
        return generateBooklistWithNBooks(1);
    }

    public static Booklist generateBooklistWithNBooks(int numBooks) {
        Booklist booklist = new Booklist();
        booklist.setId("id");
        booklist.setName("a booklist");
        booklist.setCustomerId("customerABC");
        booklist.setTags(Collections.singleton("tag"));

        List<String> asins = new ArrayList<>();
        for (int i = 0; i < numBooks; i++) {
            asins.add(BookTestHelper.generateBook(i).getAsin());
        }
        booklist.setAsins(asins);
        booklist.setBookCount(asins.size());

        return booklist;
    }
}