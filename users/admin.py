from django.contrib import admin
from users import models as users_models

# Register your models here.

@admin.register(users_models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "last_name", "first_name", "user_email"]
    search_fields = ["last_name", "first_name", "user_email"]
    list_filter = ["deleted"]
    ordering = ["last_name"]

    class Meta:
        verbose_name = ("Пользователи TODO")


