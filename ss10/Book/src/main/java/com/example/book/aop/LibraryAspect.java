package com.example.book.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.slf4j.LoggerFactory;

import org.slf4j.Logger;

public class LibraryAspect {
    private static final Logger log = LoggerFactory.getLogger(LibraryAspect.class);

    //Đếm lượt truy cập
    @After("execution(* com.example.library.controller.BookController.*(..))")
    public void logVisitor(JoinPoint joinPoint) {
        log.info("[VISITOR] Có người ghé thăm thư viện → method: {}",
                joinPoint.getSignature().getName());
    }

    //Thay đổi trạng thái sách
    @AfterReturning(
            pointcut = "execution(* com.example.book.service.BookServiceImpl.borrowBook(..))",
            returning = "borrowCode"
    )
    public void logBorrow(JoinPoint joinPoint, Object borrowCode) {
        Object bookId = joinPoint.getArgs()[0];
        log.info("[BORROW] Mượn sách thành công → bookId={}, mã mượn={}",
                bookId, borrowCode);
    }

    @AfterReturning(
            pointcut = "execution(* com.example.library.service.BookServiceImpl.returnBook(..))"
    )
    public void logReturn(JoinPoint joinPoint) {
        Object borrowCode = joinPoint.getArgs()[0];
        log.info("[RETURN] Trả sách thành công → mã mượn={}", borrowCode);
    }

    //Log khi có lỗi
    @AfterThrowing(
            pointcut = "execution(* com.example.library.service.BookServiceImpl.*(..))",
            throwing = "ex"
    )
    public void logError(JoinPoint joinPoint, Exception ex) {
        log.warn("[ERROR] Thao tác thất bại → method={}, lý do={}",
                joinPoint.getSignature().getName(), ex.getMessage());
    }

}
