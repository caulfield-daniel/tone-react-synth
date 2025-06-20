from rest_framework import routers
from .views import PresetViewSet

router = routers.DefaultRouter()
router.register(r"presets", PresetViewSet, basename="preset")

urlpatterns = router.urls
