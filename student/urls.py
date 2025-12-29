from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, export_students_excel

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')

urlpatterns = [
    path('', include(router.urls)),
    path('export-excel/', export_students_excel, name='export-student-excel'),
]

