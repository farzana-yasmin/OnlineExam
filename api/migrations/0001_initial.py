# Generated by Django 3.1.2 on 2020-10-23 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Examination',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('total_questions', models.IntegerField()),
                ('total_set', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=255)),
                ('is_answer', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('questions', models.ManyToManyField(to='api.Question')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('set', models.IntegerField()),
                ('examination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.examination')),
                ('questions', models.ManyToManyField(to='api.Question')),
            ],
        ),
        migrations.CreateModel(
            name='OptionSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_answer', models.BooleanField(default=False)),
                ('option', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.option')),
                ('question_set', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.questionset')),
            ],
        ),
        migrations.AddField(
            model_name='option',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='option_set', to='api.question'),
        ),
        migrations.AddField(
            model_name='examination',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subject'),
        ),
    ]
