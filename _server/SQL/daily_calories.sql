-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Czas generowania: 24 Maj 2020, 14:33
-- Wersja serwera: 10.2.31-MariaDB
-- Wersja PHP: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `u463745410_BodyMentor`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `daily_calories`
--

CREATE TABLE `daily_calories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `kCal_100g` int(11) NOT NULL,
  `DT` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `FoodType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `daily_calories`
--

INSERT INTO `daily_calories` (`id`, `user_id`, `weight`, `kCal_100g`, `DT`, `created_at`, `FoodType`) VALUES
(1364, 1, 10, 386, '2020-03-28', '2020-03-28 12:12:17', 'Grains'),
(1365, 1, 20, 712, '2020-03-28', '2020-03-28 12:12:44', 'Nuts'),
(1366, 1, 5, 700, '2020-03-28', '2020-03-28 12:13:00', 'Animal Product'),


--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `daily_calories`
--
ALTER TABLE `daily_calories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla tabel zrzutów
--

--
-- AUTO_INCREMENT dla tabeli `daily_calories`
--
ALTER TABLE `daily_calories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2275;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
