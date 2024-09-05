from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ChartAPITests(APITestCase):

    def test_candlestick_data(self):
        """
        Ensure the candlestick data endpoint returns the correct data structure and status code.
        """
        url = reverse('candlestick-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['data'], list)
        self.assertGreater(len(response.data['data']), 0)

    def test_line_chart_data(self):
        """
        Ensure the line chart data endpoint returns the correct data structure and status code.
        """
        url = reverse('line-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['labels'], list)
        self.assertIsInstance(response.data['data'], list)

    def test_bar_chart_data(self):
        """
        Ensure the bar chart data endpoint returns the correct data structure and status code.
        """
        url = reverse('bar-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['labels'], list)
        self.assertIsInstance(response.data['data'], list)

    def test_pie_chart_data(self):
        """
        Ensure the pie chart data endpoint returns the correct data structure and status code.
        """
        url = reverse('pie-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)
        self.assertIsInstance(response.data['labels'], list)
        self.assertIsInstance(response.data['data'], list)
