from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Preset
from .serializers import PresetSerializer


class PresetViewSet(viewsets.ModelViewSet):
    """
    CRUD для пресетов. При POST: если имя занято, вернём 400 с сообщением.
    """

    queryset = Preset.objects.all().order_by("-created_at")
    serializer_class = PresetSerializer

    def create(self, request, *args, **kwargs):
        # Получаем имя и данные из запроса
        name = request.data.get("name")
        data = request.data.get("data")
        if not name or data is None:
            return Response(
                {"error": 'Поля "name" и "data" обязательны'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Проверяем существование с таким именем
        if Preset.objects.filter(name=name).exists():
            return Response(
                {"error": f'Пресет с именем "{name}" уже существует'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Если нет дубликата, создаём
        preset = Preset.objects.create(name=name, data=data)
        serializer = self.get_serializer(preset)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
