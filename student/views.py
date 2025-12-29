from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

import openpyxl
from django.http import HttpResponse

def export_students_excel(request):
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="students.xlsx"'

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Students"

    # Header
    ws.append(['Name', 'Roll', 'City'])

    students = Student.objects.all()
    for student in students:
        ws.append([student.name, student.roll, student.city])

    wb.save(response)
    return response
