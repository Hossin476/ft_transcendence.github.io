from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, Block


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "is_staff", "is_active","email",)
    list_filter = ("username", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("username", "password","email",)}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions", "profile_image")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "username", "password1", "password2", "is_staff","email",
                "is_active", "groups", "user_permissions","profile_image"
            )}
        ),
    )
    search_fields = ("username",)
    ordering = ("username",)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Block)