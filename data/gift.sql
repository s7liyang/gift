-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 05 月 15 日 11:19
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `gift`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `aid` int(30) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `detail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`aid`, `userid`, `name`, `phone`, `postcode`, `area`, `detail`) VALUES
(1, 1, '李杨', '13416366009', '400714', '重庆 北碚区', '泰和路');

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(20) NOT NULL,
  `adminPass` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `adminName`, `adminPass`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `cartid` int(30) NOT NULL AUTO_INCREMENT,
  `userid` int(30) DEFAULT NULL,
  PRIMARY KEY (`cartid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`cartid`, `userid`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `cart_detail`
--

CREATE TABLE IF NOT EXISTS `cart_detail` (
  `did` int(30) NOT NULL AUTO_INCREMENT,
  `cartid` int(30) DEFAULT NULL,
  `productId` int(30) DEFAULT NULL,
  `count` int(30) DEFAULT NULL,
  PRIMARY KEY (`did`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- 表的结构 `coupon`
--

CREATE TABLE IF NOT EXISTS `coupon` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(10) DEFAULT NULL,
  `couponTime` bigint(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `coupon`
--

INSERT INTO `coupon` (`cid`, `price`, `couponTime`, `status`, `userId`) VALUES
(1, 20, 1492500342000, 2, 1),
(2, 10, 1492500349000, 1, 1),
(4, 20, 1492609467000, 1, 1),
(5, 100, 1492609482000, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `fid` int(30) NOT NULL AUTO_INCREMENT,
  `userid` int(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `text` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `index_swiper`
--

CREATE TABLE IF NOT EXISTS `index_swiper` (
  `sid` int(30) NOT NULL AUTO_INCREMENT,
  `pid` int(30) DEFAULT NULL,
  `src` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `index_swiper`
--

INSERT INTO `index_swiper` (`sid`, `pid`, `src`) VALUES
(1, 1, '/assert/img/index_swiper1.jpg'),
(2, 2, '/assert/img/index_swiper2.jpg'),
(3, 3, '/assert/img/index_swiper3.jpg'),
(4, 4, '/assert/img/index_swiper4.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `my_order`
--

CREATE TABLE IF NOT EXISTS `my_order` (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `price` float(12,2) DEFAULT NULL,
  `sumCount` int(11) DEFAULT NULL,
  `orderTime` bigint(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `my_order`
--

INSERT INTO `my_order` (`oid`, `price`, `sumCount`, `orderTime`, `status`, `userId`) VALUES
(1, 246.00, 2, 1492609062000, 1, 1),
(2, 79.00, 1, 1492609725000, 1, 1),
(3, 48.00, 1, 1492609761000, 1, 1),
(4, 128.00, 1, 1492609833000, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `newslist`
--

CREATE TABLE IF NOT EXISTS `newslist` (
  `newid` int(30) NOT NULL AUTO_INCREMENT,
  `pid` int(30) DEFAULT NULL,
  `src` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`newid`),
  UNIQUE KEY `newid` (`newid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `newslist`
--

INSERT INTO `newslist` (`newid`, `pid`, `src`) VALUES
(1, NULL, '/assert/img/news1_1.jpg'),
(2, NULL, '/assert/img/news2_1.jpg'),
(3, NULL, '/assert/img/news3_1.jpg'),
(4, NULL, '/assert/img/news4_1.jpg'),
(5, NULL, '/assert/img/news5_1.jpg'),
(6, NULL, '/assert/img/news6_1.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `order_detail`
--

CREATE TABLE IF NOT EXISTS `order_detail` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`did`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `order_detail`
--

INSERT INTO `order_detail` (`did`, `orderId`, `productId`, `count`) VALUES
(1, 1, 2, 1),
(2, 1, 15, 1),
(3, 2, 5, 1),
(4, 3, 15, 1),
(5, 4, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `pid` int(30) NOT NULL AUTO_INCREMENT,
  `pname` varchar(30) DEFAULT NULL,
  `price` float(10,1) DEFAULT NULL,
  `pic` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`pid`, `pname`, `price`, `pic`) VALUES
(1, '森林幻想曲', 166.0, '/assert/img/product1.jpg'),
(2, '萌宠化妆镜', 148.0, '/assert/img/product2.jpg'),
(3, '翻翻灯', 159.0, '/assert/img/product3.jpg'),
(4, '趴趴熊-音乐枕', 146.0, '/assert/img/product4.jpg'),
(5, '酷玩音乐台灯', 79.0, '/assert/img/product5.jpg'),
(6, '爱的旋律', 97.0, '/assert/img/product6.jpg'),
(7, '花儿朵朵开', 138.0, '/assert/img/product7.jpg'),
(8, '温暖你星窝', 98.0, '/assert/img/product8.jpg'),
(9, '男神风范', 199.0, '/assert/img/product9.jpg'),
(10, '神烦狗', 98.0, '/assert/img/product10.jpg'),
(11, '云端的爱恋', 89.0, '/assert/img/product11.jpg'),
(12, '音乐果冻', 149.0, '/assert/img/product12.jpg'),
(13, '萌宠暖手宝', 108.0, '/assert/img/product13.jpg'),
(14, '美好的你', 189.0, '/assert/img/product14.jpg'),
(15, '蝶恋花', 148.0, '/assert/img/product15.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `product_detail`
--

CREATE TABLE IF NOT EXISTS `product_detail` (
  `pid` int(30) DEFAULT NULL,
  `src1` varchar(100) DEFAULT NULL,
  `src2` varchar(100) DEFAULT NULL,
  `src3` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product_detail`
--

INSERT INTO `product_detail` (`pid`, `src1`, `src2`, `src3`) VALUES
(1, '/assert/img/product1_detail1.jpg', '/assert/img/product1_detail2.jpg', '/assert/img/product1_detail3.jpg'),
(2, '/assert/img/product2_detail1.jpg', '/assert/img/product2_detail2.jpg', '/assert/img/product2_detail3.jpg'),
(3, '/assert/img/product3_detail1.jpg', '/assert/img/product3_detail2.jpg', '/assert/img/product3_detail3.jpg'),
(4, '/assert/img/product4_detail1.jpg', '/assert/img/product4_detail2.jpg', '/assert/img/product4_detail3.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `product_swiper`
--

CREATE TABLE IF NOT EXISTS `product_swiper` (
  `pid` int(30) DEFAULT NULL,
  `src1` varchar(100) DEFAULT NULL,
  `src2` varchar(100) DEFAULT NULL,
  `src3` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product_swiper`
--

INSERT INTO `product_swiper` (`pid`, `src1`, `src2`, `src3`) VALUES
(1, '/assert/img/product1_swiper1.jpg', '/assert/img/product1_swiper2.jpg', '/assert/img/product1_swiper3.jpg'),
(2, '/assert/img/product2_swiper1.jpg', '/assert/img/product2_swiper2.jpg', '/assert/img/product2_swiper3.jpg'),
(3, '/assert/img/product3_swiper1.jpg', '/assert/img/product3_swiper2.jpg', '/assert/img/product3_swiper3.jpg'),
(4, '/assert/img/product4_swiper1.jpg', '/assert/img/product4_swiper2.jpg', '/assert/img/product4_swiper3.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(30) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `money` int(100) DEFAULT '0',
  `userimg` varchar(150) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `sign` varchar(200) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `nickname`, `money`, `userimg`, `email`, `phone`, `sex`, `birth`, `sign`, `time`) VALUES
(1, 'liyang', '123456', '花生', 799, '/assert/img/userimg.jpg', '767478876@qq.com', '13436166009', 1, '2017-04-01', '今天天气好晴朗啊！', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
