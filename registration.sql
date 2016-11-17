-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2016 at 01:21 AM
-- Server version: 5.5.32
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `registration`
--
CREATE DATABASE IF NOT EXISTS `registration` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `registration`;

-- --------------------------------------------------------

--
-- Table structure for table `academic_info`
--

CREATE TABLE IF NOT EXISTS `academic_info` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dept_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SSC` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HSC` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `academic_info`
--

INSERT INTO `academic_info` (`id`, `name`, `dept_name`, `SSC`, `HSC`) VALUES
(8115191, 'M.G.H.H.', 'CSE', '1979', '1981'),
(8115192, 'E.H.', 'CSE', '1979', '1981'),
(8115190, 'R.H.R.', 'CSE', '1979', '1981');

-- --------------------------------------------------------

--
-- Table structure for table `eco_info`
--

CREATE TABLE IF NOT EXISTS `eco_info` (
  `id` int(11) NOT NULL DEFAULT '0',
  `donation` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `eco_info`
--

INSERT INTO `eco_info` (`id`, `donation`) VALUES
(8115191, 200),
(8115192, 100),
(8115190, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hall_info`
--

CREATE TABLE IF NOT EXISTS `hall_info` (
  `id` int(11) NOT NULL DEFAULT '0',
  `hall_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hall_info`
--

INSERT INTO `hall_info` (`id`, `hall_name`) VALUES
(8115191, 'Dr. Qudrat-E-Khuda Hall'),
(8115192, 'Bangabondhu Hall'),
(8115190, 'Dr. Qudrat-E-Khuda Hall');

-- --------------------------------------------------------

--
-- Table structure for table `level-1term-1`
--

CREATE TABLE IF NOT EXISTS `level-1term-1` (
  `course_code` varchar(10) NOT NULL,
  `course_title` varchar(50) NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `level-1term-1`
--

INSERT INTO `level-1term-1` (`course_code`, `course_title`, `credit`) VALUES
('CSE-141', 'Computer Basics and Programming', 3),
('ME-143', 'Basic Mechanical Engineering', 3),
('Math-141', 'Differential Calculus and Integral Calculus', 3),
('Phy-141', 'Physics', 3),
('Hum-141', 'English and Economics', 4),
('CSE-142', 'Computer Basics and Programming (Sessional)', 1.5),
('ME-144', 'Basic Mechanical Engineering (Sessional)', 0.75),
('Phy-142', 'Physics (Sessional)', 1.5);

-- --------------------------------------------------------

--
-- Table structure for table `level-1term-2`
--

CREATE TABLE IF NOT EXISTS `level-1term-2` (
  `course_code` varchar(10) NOT NULL,
  `course_title` varchar(60) NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `level-1term-2`
--

INSERT INTO `level-1term-2` (`course_code`, `course_title`, `credit`) VALUES
('CSE-143', 'Object Oriented Programming', 3),
('EE-181', 'Basic Electrical Engineering', 3),
('Math-143', 'Co-ordinate Geometry & ordinary Differential Equation', 3),
('Chem-141', 'Chemistry', 3),
('Hum-143', 'Sociology & Government', 3),
('CSE-144', 'Object Oriented Programming (Sessional)', 1.5),
('EE-182', 'Basic Electrical Engineering (Sessional)', 1.5),
('ME-146', 'Engineering Drawing (Sessional)', 1.5),
('Chem-142', 'Chemistry (Sessional)', 0.75);

-- --------------------------------------------------------

--
-- Table structure for table `level-2term-1`
--

CREATE TABLE IF NOT EXISTS `level-2term-1` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level-2term-2`
--

CREATE TABLE IF NOT EXISTS `level-2term-2` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level-3term-1`
--

CREATE TABLE IF NOT EXISTS `level-3term-1` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(65) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `level-3term-1`
--

INSERT INTO `level-3term-1` (`course_code`, `course_title`, `credit`) VALUES
('CSE-323', 'Applied Statistics & Queuing Theory', 3),
('CSE-331', 'Theory of Computing', 2),
('CSE-333', 'Microprocessors and Assembly Language Programming', 3),
('CSE-341', 'Numerical Analysis', 3),
('CSE-351', 'Database Management Systems', 3),
('CSE-334', 'Microprocessors and Assembly Language Programming (Sessional)', 1.5),
('CSE-342', 'Numerical Analysis (Sessional)', 1.5),
('CSE-352', 'Database Management Systems (Sessional)', 1.5);

-- --------------------------------------------------------

--
-- Table structure for table `level-3term-2`
--

CREATE TABLE IF NOT EXISTS `level-3term-2` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level-4term-1`
--

CREATE TABLE IF NOT EXISTS `level-4term-1` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level-4term-1optional`
--

CREATE TABLE IF NOT EXISTS `level-4term-1optional` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level-4term-2`
--

CREATE TABLE IF NOT EXISTS `level-4term-2` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level-4term-2optional`
--

CREATE TABLE IF NOT EXISTS `level-4term-2optional` (
  `course_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `course_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `credit` float NOT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `isregistered` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `password` (`password`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `password`, `isregistered`) VALUES
(8115191, 'ec30512b4219292dfbdf4696b7824bd23dd1ae53', 0),
(8115192, '0c51ca07081491ffad84f0ee2ebfc41350451723', 0),
(8115190, 'c1d6fbb0671b5065f4a61cc80cd80d96b4f33259', 0);

-- --------------------------------------------------------

--
-- Table structure for table `personal_info`
--

CREATE TABLE IF NOT EXISTS `personal_info` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `father_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mother_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contact_no` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `present_add` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permanent_add` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nationality` varchar(40) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `personal_info`
--

INSERT INTO `personal_info` (`id`, `name`, `father_name`, `mother_name`, `contact_no`, `present_add`, `permanent_add`, `nationality`) VALUES
(8115191, 'M.G.H.H.', 'Blah', 'Blah', '', 'Dr. Qudrat-E-Khuda Hall', '', 'Bangladeshi'),
(8115192, 'E.H.', 'Blah', 'Blah', '', 'Bangabondhu Hall', '', 'Bangladeshi'),
(8115190, 'R.H.R.', 'Blah', 'Blah', '', 'Dr. Qudrat-E-Khuda Hall', '', 'Bangladeshi');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `termcourse`
--

CREATE TABLE IF NOT EXISTS `termcourse` (
  `course1` varchar(40) NOT NULL,
  `course2` varchar(40) NOT NULL,
  `course3` varchar(40) NOT NULL,
  `course4` varchar(40) NOT NULL,
  `level_term` int(11) NOT NULL,
  `course5` varchar(40) NOT NULL,
  `course6` varchar(40) NOT NULL,
  `course7` varchar(40) NOT NULL,
  `course8` varchar(40) NOT NULL,
  `amount` float NOT NULL,
  PRIMARY KEY (`level_term`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `termcourse`
--

INSERT INTO `termcourse` (`course1`, `course2`, `course3`, `course4`, `level_term`, `course5`, `course6`, `course7`, `course8`, `amount`) VALUES
('CSE-323', 'CSE-331', 'CSE-333', 'CSE-341', 31, 'CSE-351', 'CSE-334', 'CSE-342', 'CSE-352', 980);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
