from rest_framework import serializers
from .models import Preset


class PresetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preset
        fields = ["id", "name", "data", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
